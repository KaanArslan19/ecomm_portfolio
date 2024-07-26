import { compare, genSalt, hash } from "bcrypt";
import { Document, Model, ObjectId, Schema, model, models } from "mongoose";

interface emailVerificationTokenDocument extends Document {
  user: ObjectId;
  token: string;
  createdAt: Date;
}
interface Methods {
  compareToken(token: string): Promise<boolean>;
}

const emailVerificationTokenSchema = new Schema<
  emailVerificationTokenDocument,
  {},
  Methods
>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 60 * 24,
  },
});

emailVerificationTokenSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("token")) {
      return next();
    }
    const salt = await genSalt(10);
    this.token = await hash(this.token, salt);
    next();
  } catch (error) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new Error(String(error)));
    }
  }
});

emailVerificationTokenSchema.methods.compareToken = async function (
  tokenToCompare
) {
  try {
    return await compare(tokenToCompare, this.token);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(String(error));
    }
  }
};

const EmailVerificationToken =
  models.EmailVerificationToken ||
  model("EmailVerificationToken", emailVerificationTokenSchema);

export default EmailVerificationToken as Model<
  emailVerificationTokenDocument,
  {},
  Methods
>;
