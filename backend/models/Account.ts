import { Schema,model,Document } from "mongoose";

const accountSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	balance: {
		type: Number,
		require: true,
	},
});

export interface IAccountDocument extends Document {
	userId : Schema.Types.ObjectId,
	balance : number
}

export const Account = model<IAccountDocument>('Account', accountSchema);

