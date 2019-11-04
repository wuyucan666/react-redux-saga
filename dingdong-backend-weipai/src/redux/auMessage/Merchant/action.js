import {
    AU_MESSAGE_CONDITION,
    AU_MESSAGE_PAGE,
    AU_MESSAGE_LIMIT,
    EDITMESSAGE,
    EDITMESSAGE_DETAILS,
    AU_MESSAGE_LIST_EMPTY
  } from './constants';


export const userCondition =(parmas) => {
    return {
        type: AU_MESSAGE_CONDITION,
        parmas
    }
};

export const userResultPage =(page) => {
    return {
        type: AU_MESSAGE_PAGE,
        page
    }
};

export const userResultLimit =(limit) => {
    return {
        type: AU_MESSAGE_LIMIT,
        limit
    }
};

export const editMessage =(parmas) => {
    return {
        type: EDITMESSAGE,
        parmas
    }
};

export const editdetailsMessage =(id) => {
        return {
            type: EDITMESSAGE_DETAILS,
            id
        }
    };

export const userListEmpty =(val) => {
    console.log(val)
    return {
        type: AU_MESSAGE_LIST_EMPTY,
        val
    }
};           

