import React, { useEffect, useState, useRef } from 'react'
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal.jsx';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages.js'
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';





function Posts() {

   const [posts, setPosts] = useState([])
   const [filter, setFilter] = useState({ sort: '', query: '' })
   const [modal, setModal] = useState(false)
   const [totalPages, setTotalPages] = useState(0);
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(1)
   const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)
   const lastElement = useRef()
  
   console.log(lastElement)



   const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
      const response = await PostService.getAll(limit, page)
      setPosts([...posts, ...response.data])
      const totalCount = response.headers['x-total-count']
      setTotalPages(response.headers['x-total-count'])
      setTotalPages(getPageCount(totalCount, limit))
   })

   
   useObserver(lastElement,page<totalPages,isPostsLoading,()=>{setPage(page+1)})
   useEffect(() => {
      fetchPosts(limit, page)
   }, [page,limit])

   const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
   }

   const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
   }

   const changePage = (page) => {
      setPage(page)

   }

   return (
      <div className="App">

         <MyButton style={{ marginTop: '20px' }} onClick={() => setModal(true)}>
            Create user
         </MyButton>
         <MyModal visable={modal} setVisable={setModal}>
            <PostForm create={createPost} />
         </MyModal>

         <hr style={{ margin: '15px 0' }} />

         <PostFilter
            filter={filter}
            setFilter={setFilter}
         />
         <MySelect
         value={limit}
         onChange={value => setLimit(value)}
         defaultValue='Amount of elements on the page'
         options={[
            {value:5,name:'5'},
            {value:10,name:'10'},
             {value:25,name:'25'},
             {value:-1,name:'show all'}
         ]}

         />
         {postError && <h1>{postError}</h1>
         }
         <PostList remove={removePost} posts={sortedAndSearchPosts} title={'Post List 1'} />
         <div ref={lastElement} style={{ height: 20, background: 'red' }}></div>
         {isPostsLoading &&
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>

         }

         <Pagination
            page={page}
            changePage={changePage}
            totalPages={totalPages}
         />

      </div>
   );
}

export default Posts;
