import React, { useEffect, useState } from 'react';
import { fetchAsJson } from '../piping';
import { PostListing, Props as PostListingProps } from './PostListing';
export const Posts = () => {
    const [postState, setPosts] = useState({ state: 'before', posts: [] });
    const asyncSetPosts = async (jsonData: any) => setPosts({ state: 'loaded', posts: (await jsonData).posts });

    useEffect(() => {
        setPosts({ ...postState, state: 'during' });
        // prettier-ignore
        '/posts/postDefinition.json' |> fetchAsJson |> asyncSetPosts;
    }, []);


    return <div>

        {postState.state == 'before' && <></>}
        {postState.state === 'during' && <>...</>}
        {postState.state === 'loaded' && postState.posts.map((entry: PostListingProps) => { return <PostListing key={entry.title} item={entry} /> })}


    </div>
}