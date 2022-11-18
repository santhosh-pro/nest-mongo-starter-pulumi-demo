import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cat.schema';
import { ClientSession, Document, Model, Types } from 'mongoose';
import {
  DEFAULT_PAGINATED_ITEMS_COUNT,
  MongooseQueryModel,
  PagedModel
} from '../helper';
import { SortingDirection } from '@common/sorting-direction';

@Injectable()
export class CatService {
  constructor(
    @InjectModel('Cat')
    protected readonly model: Model<Cat & Document>
  ) {}

  public async findAll(model: MongooseQueryModel): Promise<Cat[]> {
    const query = this.model.find({ ...model.filter });
    if (model.populate && model.populate.length) {
      query.populate(model.populate);
    }

    if (model.select) {
      query.select(model.select);
    }

    if (model.lean) {
      query.lean();
    }

    if (model.sort) {
      query.sort({ [model.sort]: model.sortBy || 'asc' });
    }

    return query.exec();
  }

  public async findById(id: string): Promise<Cat> {
    const query = this.model.findById(new Types.ObjectId(id));

    return query.exec();
  }

  public async findOne(model: MongooseQueryModel): Promise<Cat> {
    const query = this.model.findOne({
      ...model.filter
    });
    if (model.populate && model.populate.length) {
      query.populate(model.populate);
    }

    if (model.select) {
      query.select(model.select);
    }

    if (model.lean) {
      query.lean();
    }

    if (model.sort) {
      query.sort({ [model.sort]: model.sortBy || 'asc' });
    }

    return query.exec();
  }

  public async insert(doc: Partial<Cat>, session: ClientSession): Promise<any> {
    return await this.model.create([doc], {
      session
    });
  }

  public async insertMany(
    doc: Partial<Cat[]>,
    session: ClientSession
  ): Promise<Cat[]> {
    return await this.model.create(doc, {
      session
    });
  }

  public async updateById(
    id: any,
    updatedDoc: any,
    session: ClientSession
  ): Promise<any> {
    return await this.model
      .updateOne({ _id: id }, updatedDoc, { session })
      .exec();
  }

  public async update(
    condition: any,
    updatedDoc: any,
    session: ClientSession
  ): Promise<any> {
    return await this.model
      .updateOne(condition, updatedDoc, { session })
      .exec();
  }

  public async updateMany(
    filter: any,
    updatedDoc: any,
    session: ClientSession
  ): Promise<any> {
    return this.model.updateMany(filter, updatedDoc, { session, multi: true });
  }

  public async pagedAsync(
    pageNumber: any,
    pageSize: any,
    orderByPropertyName: string,
    sortingDirection: SortingDirection,
    filter: any = {}
  ): Promise<PagedModel<any>> {
    pageSize = Number(pageSize) || DEFAULT_PAGINATED_ITEMS_COUNT;
    pageNumber = Number(pageNumber) || 1;

    const query = this.model
      .find({ ...filter })
      .skip(pageSize * pageNumber - pageSize)
      .limit(pageSize);

    // if (populate) {
    //   query.populate(populate);
    // }

    // if (select) {
    //   query.select(select);
    // }

    if (orderByPropertyName) {
      query.sort({
        [orderByPropertyName]: sortingDirection || SortingDirection.Ascending
      });
    }

    const result = await query.lean().exec();
    result.forEach((doc: any) => {
      doc.id = String(doc._id);
    });
    const numberOfDocs = await this.model.countDocuments({ ...filter });

    return {
      pageNumber: pageNumber,
      totalCount: numberOfDocs,
      totalPages: Math.ceil(numberOfDocs / pageSize),
      pageSize: pageSize,
      orderByPropertyName: orderByPropertyName,
      sortingDirection: sortingDirection,
      items: result
    };
  }

  public async count(filter: any = {}): Promise<number> {
    return this.model.count(filter);
  }

  public async delete(id: string): Promise<any> {
    return this.model.deleteOne(new Types.ObjectId(id)).exec();
  }

  public async deleteMany(filter: any): Promise<any> {
    return this.model.deleteMany({ filter }).exec();
  }

  // public toObjectId(id: string | number): Types.ObjectId {
  //   return new Types.ObjectId(id);
  // }

  // public isValidObjectId(id: string) {
  //   return Types.ObjectId.isValid(id);
  // }

  // private queryBuilder(model: MongooseQueryModel, query: any) {
  //   if (model.populate && model.populate.length) {
  //     query.populate(model.populate);
  //   }

  //   if (model.select) {
  //     query.select(model.select);
  //   }

  //   if (model.lean) {
  //     query.lean();
  //   }

  //   if (model.sort) {
  //     query.sort({ [model.sort]: model.sortBy || 'asc' });
  //   }
  // }
}
