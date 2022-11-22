import {
    Backdrop,
    Box,
    Button,
    Card,
    CardActions,
    CardContent, CircularProgress,
    Dialog, DialogActions, DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, TextField,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {setBlogList} from "./redux/features/blogSlice"
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";

function App() {
    const [openDialogAdd, setOpenDialogAdd] = useState(false);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [openBackDrop, setOpenBackDrop] = useState(true);
    const [detailPost, setDetailPost] = useState({
        id: '',
        userId: '',
        title: '',
        body: ''
    });
    const [addForm, setAddForm] = useState({
        title: '',
        body: ''
    });
    const dispatch = useDispatch();
    const blogList = useSelector(state => state.blogs.blogList)


    const handleOpenDialog = () => {
        setOpenDialogAdd(true);
    }

    const handleAddPost = () => {
        setOpenDialogAdd(false);
        // Call Api here with state addForm

    }

    const showDetailPost = (id) => {
        const detailPost = blogList.filter(post => post.id === id);
        setDetailPost(detailPost[0]);
        setOpenDetailDialog(true);
    }

    const handleChangeAddForm = (e) => {
        setAddForm({...addForm, [e.target.name]: e.target.value});
    }

    const getPostAPI = async () => {
        return await axios.get('https://jsonplaceholder.typicode.com/posts')
    }

    useEffect(() => {
        getPostAPI().then(res => {
            dispatch(setBlogList([...res.data]))
            setOpenBackDrop(false);
        }).catch(err => console.log(err));
    }, [])

    return (
        <div className="App">
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={openBackDrop}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <h1>SETA Posts</h1>
                </Grid>
                <Grid item xs={6} margin="dense" justifyContent="flex-center">
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" onClick={handleOpenDialog}>Add New Post</Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {blogList.map((post) => (
                    <Grid item xs={3} key={post.id}>
                        <Card sx={{minWidth: 275}}>
                            <CardContent>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Title
                                </Typography>
                                <Typography noWrap variant="h5" component="div">
                                    {post.title}
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    Body
                                </Typography>
                                <Typography noWrap variant="body2">
                                    {post.body}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => showDetailPost(post.id)}>Detail</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={openDialogAdd} onClose={() => setOpenDialogAdd(false)}>
                <DialogTitle>Add new Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Share your post to the World
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={addForm.title}
                        onChange={handleChangeAddForm}
                    />
                    <TextField
                        multiline
                        rows={4}
                        autoFocus
                        margin="dense"
                        name="body"
                        label="Body"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={addForm.body}
                        onChange={handleChangeAddForm}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialogAdd(false)}>Cancel</Button>
                    <Button onClick={handleAddPost}>Subscribe</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDetailDialog} onClose={() => setOpenDetailDialog(false)}>
                <DialogTitle>{detailPost.title}</DialogTitle>
                <DialogContent>
                    User: {detailPost.userId}
                </DialogContent>
                <DialogContent>
                    {detailPost.body}
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default App;
