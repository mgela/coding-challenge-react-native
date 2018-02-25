export const nav = () => ({
  type: 'NAVLIST'
})

export const articles = (data, totalPages, totalArticles)=> ({
    type: 'ARTICLES',
    data,
    totalPages: totalPages,
    totalArticles: totalArticles,
})
export const paginate = (data)=> ({
    type: 'PAGINATE',
    data,
})
