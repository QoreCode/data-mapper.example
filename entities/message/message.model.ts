import { Model } from '../model';

export enum MessageCategories {
    message = 1,
    achievement = 2,
    administrative = 3
}

export interface IMessage {
    id: number | null;
    text: string;
    receiverId: number;
    createdAt: number;
    messageCategoryId: MessageCategories;

    emojiId?: number;
    authorId?: number;
    achievementId?: number;
}

export class MessageModel extends Model implements IMessage {
    public id: number | null;
    public text: string;
    public receiverId: number;
    public createdAt: number;
    public messageCategoryId: MessageCategories;

    public emojiId?: number;
    public authorId?: number;
    public achievementId?: number;

    constructor(data: IMessage) {
        super();

        this.id = data.id;
        this.text = data.text;
        this.receiverId = data.receiverId;
        this.createdAt = +data.createdAt;
        this.emojiId = data.emojiId;
        this.messageCategoryId = data.messageCategoryId;
        this.authorId = data.authorId;
        this.achievementId = data.achievementId;
    }

    public toJson(): object {
        const model = {
            text: this.text,
            receiverId: this.receiverId,
            createdAt: this.createdAt,
            messageCategoryId: this.messageCategoryId
        };

        if (this.id !== null) {
            model['id'] = this.id;
        }

        if (this.emojiId !== undefined) {
            model['emojiId'] = this.emojiId;
        }

        if (this.authorId !== undefined) {
            model['authorId'] = this.authorId;
        }

        if (this.achievementId !== undefined) {
            model['achievementId'] = this.achievementId;
        }

        return model;
    }

    public isNew(): boolean {
        return this.id === null;
    }

    public getId(): number | null {
        return this.id;
    }
}
