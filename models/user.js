const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRageXP = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionTypes = ["starter", "pro", "business"];

const userSchema = new Schema(
	{
		name: {
			type: String,
		},
		password: {
			type: String,
			required: [true, "Set password for user"],
			minlength: 6,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			match: emailRageXP,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: {
			type: String,
			required: false,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

const registerSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().pattern(emailRageXP).required(),
	password: Joi.string().min(6).required(),
	subscription: Joi.string()
});

const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRageXP).required(),
	password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
	subscription: Joi.string().valid(...subscriptionTypes).required()
});

const schemas = {
	registerSchema,
	loginSchema,
	updateSubscriptionSchema,
};

module.exports = { User, schemas };