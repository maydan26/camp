interface FooterProp {
  totalPages: number;
  setPage: (arg: number) => void;
  currPage: number;
}

const Footer = (props: FooterProp) => {
  const { totalPages, setPage, currPage } = props;

  return (
    <div>
      <div>
        Page {currPage} from {totalPages}
      </div>
      <button onClick={() => setPage(currPage - 1)} disabled={currPage <= 1}>
        Back
      </button>
      <button
        onClick={() => setPage(currPage + 1)}
        disabled={totalPages === currPage}
      >
        Next
      </button>
    </div>
  );
};

export default Footer;
