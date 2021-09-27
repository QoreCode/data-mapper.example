import { Collection } from '../collection';
import { IMessage, MessageModel } from './message.model';

export class MessageCollection extends Collection<IMessage, MessageModel> {
    protected createModel(data: IMessage): MessageModel {
        return new MessageModel(data);
    }
}
