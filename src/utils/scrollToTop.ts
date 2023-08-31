export const scrollToTop = (num = 0) => {
  window.scrollTo({
    top: num,
    behavior: 'smooth',
  })
}