import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Stories from 'react-insta-stories';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchStories } from '../../store/reducers/storiesReduser';

// Переносим объявление функции updateSlidesPerView выше
const updateSlidesPerView = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth > 1200) return 6;
  if (screenWidth > 992) return 4;
  if (screenWidth > 768) return 3;
  return 2;
};

const StoriesSlider: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(updateSlidesPerView()); // Теперь функция объявлена до использования
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.stories);

  useEffect(() => {
    dispatch(fetchStories({}));

    const handleResize = () => {
      setSlidesPerView(updateSlidesPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  const openModal = (index: number) => {
    setCurrentStoryIndex(index);
    setModalIsOpen(true);
    window.scrollTo(0, 0); // Скроллим наверх
    document.body.style.overflow = 'hidden'; // Блокируем скролл
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = 'auto'; 
    setCurrentStoryIndex(null);
  };
  const handleStoryEnd = () => {

    closeModal(); // Закрыть модальное окно, если истории закончились

  };

  return (
    <div>
      <Swiper
        slidesPerView={slidesPerView}
        className='stories-slider'
        loop={true}
      >
        {data?.results?.map((story, index) => (
          <SwiperSlide
            key={story.id}
            onClick={() => openModal(index)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={story.image}
              alt="story-preview"
              style={{
                width: '100%',
                height: '350px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
            height: '80vh',
            padding: 0,
          },
        }}
      >
        {currentStoryIndex !== null && (
          <Stories
            stories={data.results[currentStoryIndex].promotion_stories.map((photo) => ({
              url: photo.image,
            }))}
            defaultInterval={2500}
            width={450}
            height={'100%'}
            onAllStoriesEnd={handleStoryEnd}
          />
        )}
      </Modal>
    </div>
  );
};

export default StoriesSlider;
