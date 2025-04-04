import { Dialog } from "@radix-ui/react-dialog";
import React, { useRef, useState } from "react";
import { DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2, User } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";
import { useDispatch, useSelector } from "react-redux";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://short-platfrom.onrender.com/api/v1/post/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        // Added safety check for posts array
        dispatch(setPosts([res.data.post, ...(posts || [])]));
        toast.success(res.data.message);
        setOpen(false);
        setCaption("");
        setImagePreview("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <form onSubmit={createPostHandler}>
          <DialogHeader className="text-center font-semibold">
            Create New Post
          </DialogHeader>
          <div className="flex gap-3 items-center">
            {" "}
            {/* Fixed class */}
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="profile" />
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-xs">{user?.username}</h1>
              <span className="text-gray-600 text-xs">Bio here...</span>
            </div>
          </div>
          <Textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="focus-visible:ring-transparent border-none"
            placeholder="Write a caption..."
            disabled={loading}
          />
          {imagePreview && (
            <div className="w-full h-64 flex items-center justify-center">
              {" "}
              {/* Fixed class */}
              <img
                src={imagePreview}
                alt="Post preview"
                className="object-cover h-full w-full rounded-md"
              />
            </div>
          )}
          <input
            ref={imageRef}
            type="file"
            className="hidden"
            onChange={fileChangeHandler}
            disabled={loading}
          />
          <Button
            type="button"
            onClick={() => imageRef.current.click()}
            className="w-full flex items-center justify-center bg-[#0095F6] hover:bg-[#258bcf] my-2"
            disabled={loading}
          >
            Select from computer
          </Button>
          {imagePreview &&
            (loading ? (
              <Button disabled>
                <Loader2 className="w-full mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Post
              </Button>
            ))}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
