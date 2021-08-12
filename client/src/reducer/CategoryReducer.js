export const initialState = {
    categories: [],
    loading: false,
    error: null
}

const createNewCategory = (parentId, categories, category) => {
    const { _id, name, slug, categoryImage } = category
    if (parentId == undefined) {
        return [
            ...categories,
            {
                _id, name, slug, categoryImage
            }
        ]
    }
    let myCategories = [];
    for (let cate of categories) {
        if (cate._id === parentId) {
            myCategories.push({
                ...cate,
                children: cate.children
                    ? createNewCategory(
                        parentId,
                        [
                            ...cate.children,
                            {
                                _id, name, slug, categoryImage
                            }
                        ],
                        category,
                    )
                    : []
            });
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
            const category = action.payload.category
            const updateCategory = createNewCategory(
                category.parentId,
                state.categories,
                category,
            )
            console.log("Cate :",updateCategory);
            return {
                ...state,
                categories: updateCategory,
                loading: false,
            }
        case 'ADD_NEW_CATEGORY_FAILED':
            return {
                ...initialState,
                error: action.payload.error
            }
        default:
            return initialState;
    }
}

export default CategoryReducer;