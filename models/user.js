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
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, 'Verify token is required'],
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

const customMessages = {
  'string.pattern.base': '<Ошибка от Joi или другой библиотеки валидации>'
};

const registerSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().pattern(emailRageXP).required(),
	password: Joi.string().min(6).required(),
	subscription: Joi.string()
}).messages(customMessages);

const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRageXP).required(),
	password: Joi.string().min(6).required(),
}).messages(customMessages);

const emailSchema = Joi.object({
	email: Joi.string().pattern(emailRageXP).required(),
}).messages(customMessages);

const updateSubscriptionSchema = Joi.object({
	subscription: Joi.string().valid(...subscriptionTypes).required()
});

const schemas = {
	registerSchema,
	loginSchema,
	emailSchema,
	updateSubscriptionSchema,
};

module.exports = { User, schemas };