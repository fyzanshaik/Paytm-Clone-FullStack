import { Request, Response } from 'express';
import { User, IUserDocument } from '../models/User';
import zod from 'zod';
import { Account, IAccountDocument } from '../models/Account';
import mongoose from 'mongoose';

interface CustomRequest extends Request {
	userId?: string;
}

export const getAccountBalance = async (req: CustomRequest, res: Response) => {
	const { userName } = req.query;
	try {
		const user = await User.findOne({ userName: userName });
		if (!user) {
			throw new Error("User doesn't exist");
		}
		const userId = user._id;
		const userExists = await Account.findOne({ userId: userId });
		if (!userExists) return res.status(400).json({ message: 'Error fetching your Balance' });
		res.json({ Balance: userExists.balance }).status(200);
	} catch (error) {
		console.log('error fetching account balance: ', error);
		res.json({ message: 'Internal Server Error' }).status(400);
	}
};

export const accountBalanceTransfer = async (req: CustomRequest, res: Response) => {
	const senderId = req.userId;
	console.log('Sender id : ' + senderId);
	var { to, amount }: { to: string; amount: number } = req.body;
	console.log("Before transaction amount type: "+typeof amount)
	const session = await mongoose.startSession();

	try {
		await session.startTransaction();
		const senderUser: IUserDocument | null = await User.findOne({ userName: senderId }).session(session);
		const senderObjectId = senderUser?.id;
		const sender: IAccountDocument | null = await Account.findOne({ userId: senderObjectId }).session(session);
		if (!sender || sender.balance < amount) {
			await session.abortTransaction();
			return res.status(400).json({ message: 'Insufficient Funds in your account' });
		}
		const recieverUser: IUserDocument | null = await User.findOne({ userName: to }).session(session);
		const recieverObjectId = recieverUser?.id;
		const reciever: IAccountDocument | null = await Account.findOne({ userId: recieverObjectId }).session(session);
		if (!reciever) {
			await session.abortTransaction();
			return res.status(400).json({ message: "This account doesn't exist please check Account Name" });
		}

		//   await Account.updateOne({userId:senderObjectId }, { $inc: { balance: -amount } }).session(session);
		//   await Account.updateOne({userId:senderObjectId} , { $inc: { balance: amount } }).session(session);
		console.log(`Senders Balance before: ${sender.balance}`)
		sender.balance -= amount;
		console.log(`Senders Balance after: ${sender.balance}`)
		await sender.save();
		console.log(`Recievers balance before: ${reciever.balance}`)
		console.log(typeof amount)
		reciever.balance += amount;
		console.log(`Recievers balance after: ${reciever.balance}`)

		await reciever.save();

		await session.commitTransaction();
		res.json({ message: 'Transfer successful' });
	} catch (error) {
		console.error('Error transferring balance:', error);
		await session.abortTransaction();
		res.status(500).json({ error: 'Internal server error' });
	} finally {
		session.endSession();
	}
};
