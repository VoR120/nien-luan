export const initialState = {
    categories: [],
    loading: false,
    error: null
}

const createNewCategory = (parentId, categories, category) => {
    const { _id, name, slug } = category
    if (parentId == undefined) {
        // Add root category
        return [
            ...categories,
            {
                _id, name, slug, children: []
            }
        ]
    }
    let myCategories = [];
    for (let cate of categories) {
        if (cate._id === parentId) {
            // Add chilren of parentId
            const newCate = { _id, name, slug, parentId, children: [] }
            myCategories.push({
                ...cate,
                children: cate.children.length > 0 ? [...cate.children, newCate] : [newCate]
            })
        } else {
            myCategories.push({
                ...cate,
                children: cate.children
                    ? createNewCategory(parentId, cate.children, category)
                    : []
            })
        }
    }
    return myCategories;
}

const updateCategory = (categoryState, categoryUpdate) => {
    for (let cate of categoryState) {
        if (cate._id === categoryUpdate._id) {
            cate.name = categoryUpdate.name;
            cate.slug = categoryUpdate.slug;
            cate.parentId = categoryUpdate.parentId
            return categoryState;
        } else {
            if (cate.children.length > 0) {
                updateCategory(cate.children, categoryUpdate);
            }
        }
    }
    return categoryState;
}

const deleteCategory = (categoryState, id) => {
    for (let cate of categoryState) {
        if (cate._id === id) {
            const newCate = categoryState.filter(c => c._id !== id);
            return newCate;
        } else {
            if (cate.children.length > 0) {
                const ch = deleteCategory(cate.children, id);
                cate.children = ch;
            }
        }
    }
    return categoryState;
}

const CategoryReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'GET_ALL_CATEGORY_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'GET_ALL_CATEGORY_SUCCESS':
            return {
                ...state,
                categories: action.payload.categories
            };
        case 'GET_ALL_CATEGORY_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case 'ADD_NEW_CATEGORY_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'ADD_NEW_CATEGORY_SUCCESS':
            const { category } = action.payload
            const newCategory = createNewCategory(
                category.parentId,
                state.categories,
                category,
            )
            return {
                ...state,
                categories: newCategory,
                loading: false,
            }
        case 'ADD_NEW_CATEGORY_FAILED':
            return {
                ...initialState,
                error: action.payload.error
            }
        case 'UPDATE_CATEGORY_REQUEST':
            return {
                ...initialState,
                loading: true,
            }
        case 'UPDATE_CATEGORY_SUCCESS':
            const newCategoryUpdate = updateCategory(
                state.categories,
                action.payload.category,
            )
            return {
                ...state,
                categories: newCategoryUpdate,
                loading: false,
            }
        case 'UPDATE_CATEGORY_FAILED':
            return {
                ...initialState,
                error: action.payload.error
            }
        case 'DELETE_CATEGORY_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'DELETE_CATEGORY_SUCCESS':
            const newCategoryDelete = deleteCategory(
                state.categories,
                action.payload._id)
            return {
                ...state,
                categories: newCategoryDelete,
                loading: false,
            }
        default:
            return initialState;
    }
}

export default CategoryReducer;