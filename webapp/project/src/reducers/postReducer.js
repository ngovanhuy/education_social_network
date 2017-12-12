import {postConstants} from '../constants'

function normalizePost(posts, state) {
    return posts.reduce((rs, post) => {
        rs[post.id] = {
            id: post.id,
            title: post.title,
            content: post.content,
            timeCreate: post.timeCreate,
            userCreate: post.userCreate,
            group: post.group,
            files: post.files,
        };
        return rs;
    }, {});
}

export function post(state = {loading: false, items: [], postDetail: {}}, action) {
    switch (action.type){
        case postConstants.POSTS_INSERTCOMMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case postConstants.POSTS_INSERTCOMMENT_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case postConstants.POSTS_INSERTCOMMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case postConstants.POSTS_INSERTFAVOURITE_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
            };
        case postConstants.POSTS_INSERTFAVOURITE_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case postConstants.POSTS_INSERTFAVOURITE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}