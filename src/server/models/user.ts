import { InferSchemaType, Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, immutable: true },
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    likedBeersIds: { type: [String] },
    idealBeer: {
      alcoholContent: {
        type: String,
        default: "low",
      },
      bitternessLevel: { type: String, default: "low" },
      color: { type: String, default: "pale" },
    },
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof UserSchema>;

export const UserModel = model<User>("User", UserSchema);
