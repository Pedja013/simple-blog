import React from "react";
import {Button, Card} from "react-bootstrap";

const Post = (props) => {
    return (
        <Card className="post py-3 px-4 mb-4" key={props.post.id}>
            <div className="post__header d-block d-lg-flex align-items-center justify-content-between">
                <div className="post__header-info d-block d-sm-flex mb-4 mb-lg-0">
                    <div className="post__header-title d-inline-block">
                        <h5 className="mb-0">
                            <strong>{props.post.title}</strong>
                        </h5>
                    </div>
                </div>
                <div className="post__header-controls">
                    <Button className="btn btn-dark me-3" onClick={() => props.handleEditShow(props.post.id)}>Edit</Button>
                    <Button className="btn btn-dark" onClick={() => props.handleDelete(props.post.id)}>Delete</Button>
                </div>
            </div>
            <div className="post__content my-3">
                {props.post.text}
            </div>
        </Card>
    );
};

export default Post;