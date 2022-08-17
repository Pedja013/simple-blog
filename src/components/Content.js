import React, {useCallback, useEffect, useState} from "react";
import TopContent from "./TopContent";
import Header from "./Header";
import Posts from "./Posts";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";

function Content() {
    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [id, setId] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');

    const loadPosts = useCallback(
        () => {
            console.log('load posts use Callback!')
            const apiUrl = `https://simple-blog-d0844-default-rtdb.firebaseio.com/blogposts.json`;
            fetch(apiUrl)
                .then((res) => res.json())
                .then((posts) => {
                    console.log(posts)
                    const loadedPosts = [];

                    for (const key in posts) {
                        loadedPosts.push({
                            id: key,
                            title: posts[key].title,
                            text: posts[key].text
                        });
                    }

                    setPosts(loadedPosts)
                });
            return posts
        },
        [],
    );


    useEffect(() => {
        loadPosts()
    }, [loadPosts]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            console.log("edit form")
            let post = { id, title, text}
            fetch('https://simple-blog-d0844-default-rtdb.firebaseio.com/blogposts/' + id + '.json', {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(post)
            }).then(() => {
                console.log('Post edited!')
                let oldPosts = [...posts]
                oldPosts.map(item => {
                    if (id == item.id) {
                        item.title = title;
                        item.text = text;
                    }
                    return item;
                });
                setPosts(oldPosts);
                setMessage('Post edited!')
                setShowAlert(true)
                setShow(false)
            })
        } else {
            console.log("creation form")
            let post = { title, text };
            fetch('https://simple-blog-d0844-default-rtdb.firebaseio.com/blogposts.json', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(post)
            }).then((res) => res.json())
                .then((newPost) => {
                    console.log('New post added!', 'New post:',newPost,'Older posts:', posts)
                    loadPosts()
                    setMessage('New post added!')
                    setTitle('')
                    setText('')
                    setShow(false);
                    setShowAlert(true);
                })
        }
    }

    const handleDelete = (postId) => {
        fetch('https://simple-blog-d0844-default-rtdb.firebaseio.com/blogposts/' + postId + '.json', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postId)
        }).then((res) => {
            console.log('Post deleted!');
        })
        setPosts(posts.filter((x) => x.id !== postId));
        setShowAlert(true);
        setMessage('Post deleted!')
    }

    const handleShowEditModal = (postId) => {
        const currentPost = posts.filter(item => item.id === postId);
        console.log('handleShowEditModal', currentPost[0].title, currentPost[0].text);
        setTitle(currentPost[0].title)
        setText(currentPost[0].text)
        setId(currentPost[0].id)
        setShow(true)
    }

    return (
        <section className="content">
            <Header handleShow={handleShow}/>
            <Modal show={show} onHide={handleClose} size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title as={"h5"}>Add / Edit blog post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="form-name" value={id} />
                        <div className="form-control border-0 d-flex align-items-start">
                            <label className="me-3">Title:</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-control border-0 d-flex align-items-start">
                            <label className="me-3">Text:</label>
                            <textarea
                                required
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="dark" onClick={handleSubmit}>
                        Post
                    </Button>
                    <Button variant="dark" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container className="h-100">
                <Row>
                    <Col lg={12}>
                        <TopContent
                            handleShow={handleShow}
                            showAlert={showAlert}
                            setShowAlert={setShowAlert}
                            message={message}
                        />
                    </Col>
                    <Col lg={12} className="mt-4 mt-lg-0">
                        <Posts posts={posts}
                               handleDelete={handleDelete}
                               handleShow={handleShow}
                               handleEditShow={handleShowEditModal}
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Content;