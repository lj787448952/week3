const success = require('../service/success');
const error = require('../service/error');
const Post = require('../models/posts');

const posts = {
    async getPosts(req, res) {
        const allPost = await Post.find();
        success(res, allPost);
    },
    async createdPost(req, res) {
        try {
            const { body } = req;
            if (body.content) {
                const newPost = await Post.create({
                    name: body.name,
                    content: body.content,
                    image: body.image,
                    tags: body.tags,
                    likes: body.likes
                })
                success(res, newPost);
            } else {
                error({ res, message: '資料格式錯誤 或 找不到對應ID' });
            }
        } catch (error) {
            error(res, error.message);
        }
    },
    async deleteAllPost(req, res) {
        const data = await Post.deleteMany({});
        success(res, data);
    },
    async deleteOnePost(req, res) {
        try {
            const id = await req.url.split('/').pop();
            const data = await Post.findByIdAndDelete(id);
            success(res, data);
        } catch (err) {
            error({ res, error: err.message });
        }
    },
    async updateOnePost(req, res) {
        try {
            const id = await req.url.split("/").pop();
            const { body } = req;
            body.content = body.content?.trim();
            if (!body.content || !body.name) {
                error({ res, message: '找不到對應ID' });
                return;
            }
            const patchPost = await Post.findByIdAndUpdate(id,
                {
                    $set:
                    {
                        "name": body.name,
                        "content": body.content,
                        "image": body.image,
                        "likes": body.likes,
                        "tags": body.tags
                    },

                },
                {
                    // 加這行才會返回更新後的資料，否則為更新前的資料。
                    returnDocument: 'after',
                    // update 相關語法預設 runValidators: false，需手動設寪 true。Doc:https://mongoosejs.com/docs/validation.html#update-validators
                    runValidators: true,
                    new: true
                });
            success(res, patchPost);
        } catch (err) {
            error({ res, error: err.message });
        }
    }
}
module.exports = posts;