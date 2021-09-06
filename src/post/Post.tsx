import React, { useState, useEffect } from 'react';
import { ContentRenderer } from '../content-renderer';
import { fetchAsJson } from '../piping';
import { useParams } from 'react-router-dom';

export const Post = () => {
    const routeParams = useParams()
    console.log(routeParams)
    const { id: postId } = routeParams as any

    const [postState, setPosts] = useState<{ state: 'before' | 'during' | 'loaded', post?: { title: string, content: string, themes: string[], threads: [] } }>({ state: 'before', });
    const asyncSetPosts = async (jsonData: any) => setPosts({ state: 'loaded', post: (await jsonData) });

    useEffect(() => {
        setPosts({ ...postState, state: 'during' });
        // prettier-ignore
        `/posts/${postId}.json` |> fetchAsJson |> asyncSetPosts;
    }, []);

    return <>



        {postState.state == 'before' && <></>}
        {postState.state === 'during' && <>...</>}
        {postState.state === 'loaded' && postState.post && <>
            <h3>{postState.post.title}</h3>
            <ContentRenderer postId={postId} content={postState.post?.content} /></>}
    </>
}