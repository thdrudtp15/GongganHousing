'use client';

import React, { useActionState, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { createPortfolio } from '@/actions/portfolio';
import { useRouter } from 'next/navigation';

import type { ChangeEvent } from 'react';
import type { Portfolio } from '@/types/portfolio';

type ExistingImage = {
  id: number;
  image: string;
};

type ImageItem = ExistingImage | File;

const Preview = ({
  file,
  removeImage,
}: {
  file: ImageItem;
  removeImage: (file: ImageItem) => void;
}) => {
  // const preview = URL.createObjectURL(file);

  let preview;
  if (file instanceof File) {
    preview = URL.createObjectURL(file);
  } else {
    preview = file.image;
  }
  return (
    <div className="h-40 w-40 relative" onClick={() => removeImage(file)}>
      <Image fill src={preview} alt="upload image" />
    </div>
  );
};

const PreviewImage = React.memo(Preview);

// 기존 이미지 삭제 시 삭제 배열에 in
// 추가 이미지 삭제 시에는 images 배열에서 제거

// 삭제 배열에 있는 id로 DB 조작하여 삭제 - 클라우드 이미지 삭제까지 까면 더 조을듯
// 추가 이미지의 경우 이미 정의 된 로직으로 클라우드 추가 및 DB 추가

const PortfolioForm = ({ data, imageData }: { data?: Portfolio; imageData: ExistingImage[] }) => {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [images, setImages] = useState<ImageItem[] | null | undefined>(imageData);
  const [deleteImage, setDeleteImage] = useState<ExistingImage[] | null>([]);

  const [state, formAction, pending] = useActionState(createPortfolio, {
    description: '',
    title: '',
    completed_at: '',
    category: '',
    image: '',
    server: '',
    id: '',
  });

  //========================
  // 서버액션!
  //========================
  const handleSubmit = (formData: FormData) => {
    //삭제할 이미지 파일 append
    if (deleteImage && deleteImage.length > 0) {
      deleteImage?.forEach((image: ExistingImage, index: number) => {
        formData.append(`delete_${index}`, JSON.stringify(image));
      });
      formData.append('delete_count', deleteImage.length.toString());
    }

    // 추가할 이미지 파일 append
    if (images && images.length > 0) {
      let imageCount = 0;
      images.forEach((image) => {
        if (image instanceof File) {
          formData.append(`image_${imageCount}`, image);
          imageCount++;
        }
      });
      formData.append('image_count', imageCount.toString());
    }

    if (data) {
      formData.append('id', data.id.toString());
    }

    formAction(formData);
  };

  //========================
  // 이미지 추가
  //========================
  const addImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const { files } = e.target;

    // 파일 중복 제거 및 1MB 이하 필터링
    const map = new Map();
    const MAX_SIZE = 1 * 1024 * 1024; // 1MB in bytes

    Array.from(files).forEach((file) => {
      if (file.size <= MAX_SIZE) {
        map.set(`${file.name}-${file.lastModified}-${file.size}`, file);
      }
    });
    const array = Array.from(map.values());

    if (array.length < files.length) {
      alert('1MB 이하의 파일만 업로드할 수 있습니다.');
    }

    // setter
    setImages((prev) => {
      return [...(prev ?? []), ...array];
    });

    if (imageRef.current) imageRef.current.value = '';
  };

  //========================
  // 이미지 삭제
  //========================
  const removeImage = (file: ImageItem) => {
    if (!images || images.length === 0) return;

    if ('id' in file) {
      setDeleteImage((prev) => [...(prev ?? []), file]);
    }

    const filtered = images.filter((item) => {
      if (item instanceof File && file instanceof File) {
        return !(item.name === file.name && item.lastModified === file.lastModified);
      } else if ('id' in item && 'id' in file) {
        return item.id !== file.id;
      }
      return true;
    });

    setImages(filtered);
  };
  //========================
  // 게시글 작성 및 수정 시 로직
  //========================
  useEffect(() => {
    if (!state.id) return;
    router.push(`/portfolio/${state.id}`);
  }, [state.id, router]);

  return (
    <div>
      <form ref={formRef} className="flex flex-col gap-10" action={handleSubmit}>
        <input
          className="border"
          type="text"
          placeholder="제목"
          name="title"
          defaultValue={data?.title}
        />
        {state.title}
        <input
          type="date"
          placeholder="시공 날짜"
          name="completed_at"
          defaultValue={data?.completed_at}
        />
        {state.completed_at}
        <select name="category" defaultValue={data?.category}>
          <option value="실내건축">실내건축</option>
          <option value="옥외광고물">옥외 광고물</option>
          <option value="금속창호">금속창호</option>
        </select>
        {state.category}
        <textarea
          className="border"
          placeholder="설명"
          name="description"
          defaultValue={data?.description}
        />
        {state.description}
        <button type="button" onClick={() => imageRef.current?.click()}>
          이미지 추가하기
        </button>
        {state.image}
        <input
          onChange={(e) => addImage(e)}
          ref={imageRef}
          type="file"
          className="hidden"
          accept="image/*"
          multiple
        />
        {data && <input value={data.id} type="hidden" />}
        <div className="flex gap-2">
          {images &&
            images.map((image, index) => {
              return (
                <React.Fragment key={index}>
                  <PreviewImage file={image} removeImage={removeImage} />
                </React.Fragment>
              );
            })}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {pending ? '등록 중...' : `시공사례 ${data ? '수정' : '등록'}`}
          {state.server}
        </button>
      </form>
    </div>
  );
};

export default PortfolioForm;
