import Pagination from "react-bootstrap/Pagination";

const LesollPagination = ({ data, page, setPage }) => {
  return (
    <Pagination className="d-flex justify-content-end">
      <Pagination.First onClick={() => setPage(0)} disabled={page === 0} />
      <Pagination.Prev
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      />
      {[
        ...Array(
          data.length % 5 !== 0
            ? parseInt(data.length / 5) + 1
            : parseInt(data.length / 5)
        ).keys(),
      ].map((index) => (
        <Pagination.Item
          key={index}
          onClick={() => setPage(index)}
          active={page === index}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => setPage(page + 1)}
        disabled={
          page === data.length % 5
            ? parseInt(data.length / 5) + 1
            : parseInt(data.length / 5)
        }
      />
      <Pagination.Last
        onClick={() =>
          setPage(
            data.length % 5 !== 0
              ? parseInt(data.length / 5) + 1
              : parseInt(data.length / 5)
          )
        }
        disabled={
          page === data.length % 5
            ? parseInt(data.length / 5) + 1
            : parseInt(data.length / 5)
        }
      />
    </Pagination>
  );
};

export default LesollPagination;
