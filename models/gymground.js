const mongoose = require("mongoose");
const { gymgroundSchema } = require("../schemas");
const Schema = mongoose.Schema;
const Review = require("./review");

const ImageSchema = new Schema(
    {
        url: String,
        filename: String
    }
);
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_150');
})

const opts = { toJSON: { virtuals: true } }

const GymgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images: [ImageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
}, opts);

GymgroundSchema.post("findOneAndDelete", async (doc) => {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews,
            },
        });
    }
});

GymgroundSchema.virtual('properties.popMarkup').get(function () {
    return `<strong><a href=MB_1/gymgrounds/${this.id}MB_2>${this.title}</a></strong>`
})

module.exports = mongoose.model("Gymground", GymgroundSchema);
