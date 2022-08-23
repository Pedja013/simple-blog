import React, {useCallback, useContext, useEffect, useState} from "react";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import TopContent from "./TopContent";
import Header from "./Header";
import Posts from "./Posts";
import Login from "./Login";
import AuthContext from "../store/auth-context";

function Content() {
    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [titleTouched, setTitleTouched] = useState(false);
    const [text, setText] = useState('');
    const [textTouched, setTextTouched] = useState(false);
    const [id, setId] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');
    const handleClose = () => {
        setShow(false)
        setText('')
        setTitleTouched(false)
        setTitle('')
        setTitleTouched(false)
        setId('')
    };
    const handleShow = () => setShow(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const ctx = useContext(AuthContext);

    // login/logout actions
    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        const storedUserEmail = localStorage.getItem('loggedUserEmail');

        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
            setCurrentUser(storedUserEmail);
        }
    }, []);

    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedIn', '1');
        localStorage.setItem('loggedUserEmail', email);
        setIsLoggedIn(true);
        setCurrentUser(email);
    };

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedUserEmail');
        setIsLoggedIn(false);
        setCurrentUser('');
    };

    // blog posts actions
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
                            text: posts[key].text,
                            userEmail: posts[key].userEmail
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

    const textChangeHandler = (event) => {
        setText(event.target.value)
    };

    const textBlurHandler = () => {
        setTextTouched(true)
    };
    const titleBlurHandler = () => {
        setTitleTouched(true)
    };

    const titleChangeHandler = (event) => {
        setTitle(event.target.value)
    };

    const titleIsValid = title.trim() !== '';
    const titleIsInvalid = !titleIsValid && titleTouched
    const textIsValid = text.trim() !== '';
    const textIsInvalid = !textIsValid && textTouched;

    const titleInputClasses = titleIsInvalid
        ? 'form-control border-0 d-flex align-items-start invalid'
        : 'form-control border-0 d-flex align-items-start';

    const textInputClasses = textIsInvalid
        ? 'form-control border-0 d-flex align-items-start invalid'
        : 'form-control border-0 d-flex align-items-start';

    const handleSubmit = (e) => {
        e.preventDefault();

        if (titleIsInvalid || textIsInvalid) {
            return;
        }

        if (id) {
            console.log("edit form")
            let post = { id, title, text, userEmail: currentUser}
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
                setText('')
                setTextTouched(false)
                setTitle('')
                setTextTouched(false)
                setShowAlert(true)
                setShow(false)
            })
        } else {
            console.log("creation form")
            let post = { title, text, userEmail: currentUser };
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
                    setTitleTouched(false)
                    setText('')
                    setTextTouched(false)
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
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                currentUserEmail: currentUser
            }}
        >
        <section className="content">
            <Header handleShow={handleShow}/>
            {!isLoggedIn && <Login onLogin={loginHandler} />}
            {isLoggedIn &&
            <Modal show={show} onHide={handleClose} size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title as={"h5"}>Add / Edit blog post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="form-name" value={id} />
                        <div className={titleInputClasses}>
                            <label className="me-3">Title:</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={titleChangeHandler}
                                onBlur={titleBlurHandler}
                            />
                        </div>
                        {titleIsInvalid && <p className="error-msg">Please enter post title.</p>}
                        <div className={textInputClasses}>
                            <label className="me-3">Text:</label>
                            <textarea
                                required
                                value={text}
                                onChange={textChangeHandler}
                                onBlur={textBlurHandler}
                            ></textarea>
                        </div>
                        {textIsInvalid && <p className="error-msg">Please enter post text.</p>}
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
            </Modal>}
            {isLoggedIn &&
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
            </Container>}
        </section>
        </AuthContext.Provider>
    );
}

export default Content;