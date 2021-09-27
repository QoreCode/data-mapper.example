import { ApiAdapter, ApiEntities } from './api.adapter';
import { IMessage, MessageModel } from '../entities/message/message.model';
import { IMessageMapper, MessageMapper } from '../entities/message/message.mapper';

export class ApiMapperFactory {
    public static createMessageMapper(): IMessageMapper {
        const adapter = new ApiAdapter<IMessage, MessageModel>(ApiEntities.message);

        return new MessageMapper(adapter);
    }
}
