import { IMessage, MessageModel } from './message.model';
import { Collection } from '../collection';
import { MessageCollection } from './message.collection';
import { Mapper } from '../mapper';
import { IMapper } from '../i-mapper';

export interface IMessageMapper extends IMapper<IMessage, MessageModel> {

}

export class MessageMapper extends Mapper<IMessage, MessageModel> {
    protected createCollection(data: IMessage[]): Collection<IMessage, MessageModel> {
        const collection = new MessageCollection();
        collection.setEntities(data);

        return collection;
    }

    protected createModel(data: MessageModel): MessageModel {
        return new MessageModel(data);
    }
}
