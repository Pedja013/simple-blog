import React from "react";
import Post from "./Post";

function Posts(props) {
    const { posts } = props;
    if (!posts || posts.length === 0) return <p>No posts, sorry</p>;
    return (
        <React.Fragment>
            {posts.map((post) =>
                <Post post={post}
                      handleDelete={props.handleDelete}
                      handleShow={props.handleShow}
                      key={post.id}
                      handleEditShow={props.handleEditShow}
                />
            )}
        </React.Fragment>
    );
}

export default Posts;