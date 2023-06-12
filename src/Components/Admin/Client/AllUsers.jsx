import { useFind } from "../../Hooks/useUser";
import { FullLoading } from "../../Shared/Loading";
import { Link } from "react-router-dom";
import { Table, Pagination } from "react-bootstrap";
import { useState, Fragment } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Image from "../../Shared/Image";

const AllUsers = () => {
  const [page, setPage] = useState(1);
  const { state, handleFindAllUsers } = useFind("all-users");
  if (state.loading) {
    return <FullLoading />;
  }

  return (
    <div className="p-5">
      <h3>All Users </h3>
      <Table responsive striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span>Image</span>
            </th>
            <th>
              <span>Fullname</span>
            </th>
            <th>
              <span>Email</span>
            </th>
            <th>
              <span>Realties </span>
            </th>
            <th>
              <span>Phone </span>
            </th>
            <th>
              <span>Date Created</span>
            </th>
            <th>
              <span>Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {state.users.map((user, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <Image
                  imageUrl={user.image}
                  height="35"
                  width="35"
                  className="border-radius-10 text-center"
                />
              </td>
              <td>
                <span>{user.fullname}</span>
              </td>
              <td>
                <span title={user.email}>
                  {user.email.slice(0, 15)}
                  {user.email.length >= 15 && "..."}
                </span>
              </td>
              <td>
                <span>{user.numRealty}</span>
              </td>
              <td>
                <span>
                  {user.googleId === user.phone || user.faceId === user.phone
                    ? "--"
                    : user.code + user.phone}
                </span>
              </td>
              <td>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </td>
              <td>
                <div>
                  <Link to={`#`}>
                    <AiOutlineEdit
                      size="1.3rem"
                      className="mx-1 cursor-pointer text-muted"
                    />
                  </Link>
                  <AiOutlineDelete
                    size="1.3rem"
                    className="mx-1 cursor-pointer text-danger"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First
          disabled={page === 1}
          onClick={() => {
            setPage(1);
            handleFindAllUsers({ page: 1 });
          }}
        />
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
            handleFindAllUsers({ page: page - 1 });
          }}
        />
        <Fragment>
          <Pagination.Item disabled>{page}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item
            disabled={page === state.nPages}
            onClick={() => {
              setPage(state.nPages);
              handleFindAllUsers({ page: state.nPages });
            }}
          >
            {state.nPages}
          </Pagination.Item>
        </Fragment>
        <Pagination.Next
          disabled={page === state.nPages}
          onClick={() => {
            setPage(page + 1);
            handleFindAllUsers({ page: page + 1 });
          }}
        />
        <Pagination.Last
          disabled={page === state.nPages}
          onClick={() => {
            setPage(state.nPages);
            handleFindAllUsers({ page: state.nPages });
          }}
        />
      </Pagination>
    </div>
  );
};

export default AllUsers;
