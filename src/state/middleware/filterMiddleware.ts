import { Middleware } from 'redux';
import { setFilteredPosts, setQuery, setCategory, setAllPosts, setAllCategory, clearFilter } from '@/state/slices/postFilterSlice';
import { RootState } from '@/state/store'
import { setPostPage } from '@/state/slices/postPageSlice';

const filterPosts = (posts: Queries.MainPageQuery['posts']['nodes'], filterQuery: string, filterCategory: string | null) => {
  return posts.filter(post => {
    const titleDetected = post.frontmatter.title.includes(filterQuery);
    const categoryDetected = filterCategory ? post.frontmatter.category?.includes(filterCategory) ?? false : true;
    let tagDetected = false;

    const tags = post.frontmatter.tags;
    if (tags && tags.length) {
      const regex = /^#(?=.*\S).+/
      const tokens = filterQuery.split(' ');
      const isTagDetect = tokens
        .filter(token => regex.test(token))
        .map(token => token.slice(1).trim());
      if (isTagDetect.length) {
        tagDetected = isTagDetect.every(token => tags.some(tag => tag.includes(token)));
      }
    }
    return categoryDetected && (titleDetected || tagDetected);
  });
};

export const filterMiddleware: Middleware<{}, RootState> = store => next => action => {
  const result = next(action);
  if (setQuery.match(action) || setCategory.match(action) || clearFilter.match(action)) {
    const { postFilter } = store.getState();
    const { query, category, allPosts } = postFilter;
    const filtered = filterPosts(allPosts, query, category);
    store.dispatch(setFilteredPosts(filtered));
    store.dispatch(setPostPage(1))
    window.scrollTo(0, 0)
  } else if (setAllPosts.match(action)) {
    const { postFilter } = store.getState();
    const { allPosts } = postFilter;
    const filtered = [...new Set(allPosts.map(post => post.frontmatter.category))]
      .filter(category => category !== null)
    store.dispatch(setAllCategory(filtered))
  }
  return result;
};
