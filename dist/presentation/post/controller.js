"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const domain_1 = require("../../domain");
class PostController {
    constructor(postService) {
        this.postService = postService;
        this.handleEror = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong! 🧨' });
        };
        this.createPost = (req, res) => {
            const [error, createPostDto] = domain_1.CreatePostDTO.create(req.body);
            // const user = req.body.sessionUser;
            if (error)
                return res.status(422).json({ message: error });
            this.postService
                .createPost(createPostDto) //el ! nos dice CONFIA jajaj que aquí si hay data
                .then((data) => {
                return res.status(201).json(data);
            })
                .catch((error) => this.handleEror(error, res));
        };
        this.findAllPost = (req, res) => {
            this.postService
                .findAllPost()
                .then((data) => {
                return res.status(200).json(data);
            })
                .catch((error) => this.handleEror(error, res));
        };
        this.findOnePost = (req, res) => {
            const { id } = req.params;
            this.postService
                .findOnePost(id)
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((error) => this.handleEror(error, res));
        };
        this.updatePost = (req, res) => {
            const { id } = req.params;
            const [error, updateProductDto] = domain_1.UpdatePostDTO.create(req.body);
            if (error)
                return res.status(422).json({ message: error });
            this.postService
                .updatePost(id, updateProductDto) // ! confia xD
                .then((data) => {
                return res.status(200).json(data);
            })
                .catch((error) => this.handleEror(error, res));
        };
        this.deletePost = (req, res) => {
            const { id } = req.params;
            this.postService
                .deletePost(id)
                .then(() => {
                return res.status(204).json(null);
            })
                .catch((error) => this.handleEror(error, res));
        };
    }
}
exports.PostController = PostController;
/*deletePost = (req: Request, res: Response) => {
        const { id } = req.params;

        this.postService
            .deletePost(id)
            .then(() => {
                return res.status(204).json(null);
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'Internal Server Error!!',
                    error,
                });
            });
    };*/
