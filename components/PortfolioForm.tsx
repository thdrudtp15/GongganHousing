'use client';

import React, {
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { createPortfolio } from '@/actions/portfolio';
import { useRouter } from 'next/navigation';

import type { ChangeEvent } from 'react';

const Preview = ({
  file,
  removeImage,
}: {
  file: File;
  removeImage: (file: File) => void;
}) => {
  const preview = URL.createObjectURL(file);
  return (
    <div
      className="h-40 w-40 relative"
      onClick={() => removeImage(file)}
    >
      <Image
        fill
        src={preview}
        alt="upload image"
      />
    </div>
  );
};
const PreviewImage = React.memo(Preview);

const PortfolioForm = () => {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [images, setImages] = useState<
    File[] | null
  >(null);

  const [state, formAction, pending] =
    useActionState(createPortfolio, {
      description: '',
      title: '',
      completed_at: '',
      category: '',
      image: '',
      server: '',
      id: '',
    });

  const handleSubmit = (formData: FormData) => {
    // images 배열의 모든 파일을 FormData에 추가
    if (images && images.length > 0) {
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image);
      });

      formData.append(
        'imageCount',
        images.length.toString(),
      );
    }

    formAction(formData);
  };

  // 이미지 추가
  const addImage = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files) return;
    const { files } = e.target;

    // 파일 중복 제거
    const map = new Map();
    Array.from(files).forEach((file) => {
      map.set(
        `${file.name}-${file.lastModified}-${file.size}`,
        file,
      );
    });
    const array = Array.from(map.values());

    // setter
    setImages((prev) => {
      return [...(prev ?? []), ...array];
    });

    if (imageRef.current)
      imageRef.current.value = '';
  };

  const removeImage = (file: File) => {
    if (!images || images.length === 0) return;
    const filtered = images.filter(
      (image) =>
        image.name !== file.name ||
        image.lastModified !== file.lastModified,
    );
    setImages(filtered);
  };

  useEffect(() => {
    if (!state.id) return;
    router.push(`/portfolio/${state.id}`);
  }, [state.id, router]);

  return (
    <div>
      <form
        ref={formRef}
        className="flex flex-col gap-10"
        action={handleSubmit}
      >
        <input
          className="border"
          type="text"
          placeholder="제목"
          name="title"
        />
        {state.title}
        <input
          type="date"
          placeholder="시공 날짜"
          name="completed_at"
        />
        {state.completed_at}
        <select name="category">
          <option value="실내건축">
            실내건축
          </option>
          <option value="옥외광고물">
            옥외 광고물
          </option>
          <option value="금속창호">
            금속창호
          </option>
        </select>
        {state.category}
        <textarea
          className="border"
          placeholder="설명"
          name="description"
        />
        {state.description}
        <button
          type="button"
          onClick={() =>
            imageRef.current?.click()
          }
        >
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
        <div className="flex gap-2">
          {images &&
            images.map((image) => {
              return (
                <React.Fragment key={image.name}>
                  <PreviewImage
                    file={image}
                    removeImage={removeImage}
                  />
                </React.Fragment>
              );
            })}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {pending
            ? '등록 중...'
            : '포트폴리오 등록'}
        </button>
      </form>
    </div>
  );
};

export default PortfolioForm;
