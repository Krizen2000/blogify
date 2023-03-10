import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CacheContext } from "../components/cacheProvider";
import {
  requestBlogDeletion,
  requestUserBlogs,
} from "../components/manageBlogs/manageBlogsHelper";

const Container = styled.div`
  display: grid;
  gap: 1rem;
`;
const BackButton = styled.button`
  min-height: 5rem;
  min-width: 5rem;
`;
const Icon = styled.i`
  font-size: ${({ iconSize }) => iconSize || "1rem"};
`;
const Table = styled.table`
  margin: 2rem 4rem;
  padding: 2rem;
  border: 0.125rem solid var(--bs-gray-500);
  border-radius: 0.5rem;
`;
export default function ManageBlogs() {
  const cacheContext = useContext(CacheContext);
  const [blogList, setBlogList] = useState([]);
  const [selectedBlogID, setSelectedBlogId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedBlogID) return;
    requestUserBlogs(cacheContext.cache["token"]).then((blogs) =>
      setBlogList(blogs)
    );
  }, [selectedBlogID]);

  return (
    <>
      <div class="modal fade" id="deleteBlogModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">Modal title</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div class="modal-body">{`Are you sure you want to delete #${selectedBlogID}`}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setSelectedBlogId("")}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#deleteBlogModal"
                onClick={() => {
                  requestBlogDeletion(
                    cacheContext.cache["token"],
                    selectedBlogID
                  ).then(() => setSelectedBlogId(""));
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <div className="d-flex align-items-center">
          <BackButton className="btn" onClick={() => navigate(-1)}>
            <Icon className="bi-arrow-left" />
          </BackButton>
          <h3>Manage Blogs</h3>
        </div>
        <Table className="table table-striped">
          <thead>
            <tr>
              {[
                "#",
                "BlogId",
                "Title",
                "Description",
                "UpdatedAt",
                "CreatedAt",
                "Actions",
              ].map((entry) => (
                <th key={entry}>{entry}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blogList.map((blog, inx) => (
              <tr key={blog.blogId}>
                <td>{inx + 1}</td>
                <td>{blog.blogId}</td>
                <td>{blog.title}</td>
                <td>{blog.description}</td>
                <td>{new Date(blog.updatedAt).toLocaleString()}</td>
                <td>{new Date(blog.createdAt).toLocaleString()}</td>
                <td className="d-flex gap-2">
                  <button
                    role={Link}
                    className="btn btn-outline-primary"
                    onClick={() => navigate(`/blogs/${blog.blogId}`)}
                  >
                    <Icon className="bi-eye" />
                  </button>
                  <button
                    role={Link}
                    className="btn btn-outline-success"
                    onClick={() => navigate(`/blogs/edit/${blog.blogId}`)}
                  >
                    <Icon className="bi-pencil" />
                  </button>
                  <button
                    role={Link}
                    className="btn btn-outline-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteBlogModal"
                    onClick={() => {
                      setSelectedBlogId(blog.blogId);
                    }}
                  >
                    <Icon className="bi-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
