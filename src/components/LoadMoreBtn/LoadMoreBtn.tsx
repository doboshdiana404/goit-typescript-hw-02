import s from './LoadMoreBtn.module.css';
interface LoadMoreBtnProps {
  handleChangePage: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleChangePage }) => {
  return (
    <div className={s.loadMore}>
      <button onClick={handleChangePage} className={s.moreBtn}>
        Load more
      </button>
    </div>
  );
};
export default LoadMoreBtn;
