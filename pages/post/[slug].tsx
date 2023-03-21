import React, { useRef, useState, useEffect } from "react";
import Navbar from "@/pages/components/Navbar";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "@/type";
import { GetStaticProps } from "next";
import Image from "next/image";
import PortableText from "react-portable-text";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillPauseCircle } from "react-icons/ai";
import { toPlainText } from "@portabletext/react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Prop {
  prop: Post;
}

interface InputField {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const Content = ({ prop }: Prop) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputField>();

  const [submitted, setsubmitted] = useState(false);

  const [play, setplay] = useState(true);
  useEffect(() => {
    return setsubmitted(false);
  }, []);
  const cont = useRef();
  let view: string = "";
  view = view + toPlainText(prop.body);
  const voice = () => {
    const msg = new SpeechSynthesisUtterance();
    let voices = speechSynthesis.getVoices();
    msg.voice = voices[0];
    if (play) {
      // if (window.speechSynthesis.paused) {
      //   window.speechSynthesis.resume;
      // } else {
      msg.text = view;
      window.speechSynthesis.speak(msg);
      // }
    }
    // } else {
    //   window.speechSynthesis.pause();
    // }

    console.log(view);
  };

  const submit: SubmitHandler<InputField> = async (data) => {
    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setsubmitted(true);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <div>
        <Image
          className="w-full h-96 object-cover"
          src={urlFor(prop.mainImage).url()}
          height={500}
          width={500}
        />
        <article
          className="max-w-4xl w-full mx-auto p-5 flex flex-col gap-2"
          id="post"
          ref={() => cont}
        >
          <div className="flex space-x-5 items-center">
            <h1 className="text-2xl font-bold">{prop.title}</h1>
            <div
              className=" bg-green-300 space-x-1 p-1 font-semibold w-20 cursor-pointer flex justify-center rounded-lg items-center"
              onClick={() => {
                voice();
                setplay(!play);
              }}
            >
              {play ? <AiFillCaretRight /> : <AiFillPauseCircle />}
              <p>Listen</p>
            </div>
          </div>
          <h2 className="font-light text-gray-500">{prop.description}</h2>
          <div className="flex space-x-3 items-center">
            <Image
              className="w-10 h-10 rounded-full"
              src={urlFor(prop.author.image).url()}
              height={300}
              width={300}
            ></Image>
            <p>
              Blog by <span className="text-green-600">{prop.author.name}</span>{" "}
              - Published at {new Date(prop.publishedAt).toUTCString()}
            </p>
          </div>
          <div>
            <PortableText
              className="mt-5"
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={prop.body}
              serializers={{
                h1: (props: any) => (
                  <h1
                    className="text-2xl font-bold font-sans my-5"
                    {...props}
                  />
                ),
                h2: (props: any) => (
                  <h2 className="text-xl font-bold my-5" {...props} />
                ),
                normal: (props: any) => (
                  <p
                    className="font-sans mt-2"
                    style={{ fontSize: "1.1rem" }}
                    {...props}
                  />
                ),
                h4: (props: any) => (
                  <h4 className="text-lg font-sans font-semibold" {...props} />
                ),
                li: ({ children }: any) => (
                  <li
                    className="ml-4 list-disc my-2
                "
                  >
                    {children}
                  </li>
                ),
                link: ({ href, children }: any) => (
                  <a
                    href={href}
                    className="text-blue-500 text-base hover:underline"
                    {...children}
                  >
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>
      </div>

      <hr className="flex my-5 border border-green-400 max-w-6xl w-full mx-auto" />

      {submitted ? (
        <div className="flex flex-col bg-green-200 max-w-4xl w-full mx-auto p-5">
          <p
            className="font-medium text-sm  flex justify-start 
        "
          >
            Comment Submitted
          </p>
          <p className="text-green-600 ">It will appear below once approved</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col p-5 mx-auto max-w-3xl w-full "
        >
          <h3 className="font-semibold text-xl mb-5">
            Feel free to Comment below 🙂
          </h3>
          <input {...register("_id")} type="hidden" value={prop._id} />
          <label className="block my-3">
            <p>Name</p>
            <input
              {...register("name", { required: true })}
              placeholder="Your name"
              type="text"
              className="shadow border rounded py-2 px-3 mt-1 w-full focus:ring outline-none ring-green-200"
            />
            {errors.name && (
              <p className="text-red-600 text-base">Name field is required</p>
            )}
          </label>
          <label className="block my-3">
            <p>Email</p>
            <input
              {...register("email", { required: true })}
              placeholder="Your email"
              className="shadow border rounded py-2 px-3 mt-1 w-full focus:ring outline-none ring-green-200"
              type="email"
            />
          </label>
          {errors.email && (
            <p className="text-red-600 text-base">Email field is required</p>
          )}
          <label className="block my-3">
            <p>Comment</p>
            <textarea
              {...register("comment", { required: true })}
              placeholder="Comment Here!"
              className="shadow border rounded py-2 px-3 mt-1 w-full focus:ring outline-none ring-green-200"
              rows={10}
            />
          </label>
          {errors.comment && (
            <p className="text-red-600 text-base my-3">
              Comment field is required
            </p>
          )}
          <button className="border shadow mb-2 bg-green-300 py-1 rounded">
            Submit
          </button>
        </form>
      )}

      <div className="flex flex-col max-w-3xl w-full shadow bg-green-100 shadow-green-300 border mx-auto gap-2 p-10 my-5">
        <h3 className="text-2xl font-semibold ">Comments</h3>
        <hr className="border border-stone-400 border-y-1 opacity-20 my-2" />
        {prop.comment.map((e) => {
          return (
            <div key={prop._id} className="my-2 flex ml-2">
              <p className="text-base">
                <span className="text-yellow-600">{e.name} : </span>
                {e.comment}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;

export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
        _id,
        slug{current},
    }`;

  const posts = await sanityClient.fetch(query);
  const paths = posts.map((data: Post) => ({
    params: {
      slug: data.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=="post" && slug.current==$slug][0]{
        _id,title,
        author->{name,image},
        mainImage,
        body,
        description,
        publishedAt,
        "comment":*[_type=="comment" && validate==true && view._ref==^._id ]
    }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      prop: post,
    },
    revalidate: 60,
  };
};
