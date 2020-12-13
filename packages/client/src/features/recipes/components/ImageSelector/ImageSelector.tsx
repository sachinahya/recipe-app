import { FC, useEffect, useReducer } from 'react';
import { useForm, useFormState } from 'react-final-form';
import { spacing } from 'styles/styleSelectors';
import { ImageInput, RecipeInput } from '../../../types.gql';
import AddImageSelection from './AddImageSelection';
import ImageSelection from './ImageSelection';
import imageSelectionReducer, {
  ImageSelectionType,
  ImageUploadStatus,
} from './imageSelectorReducer';
import useImageUpload from './useImageUpload';

const ImageSelector: FC = ({ children, ...props }) => {
  const { values } = useFormState<RecipeInput>();
  const { change } = useForm();

  const [state, dispatch] = useReducer(imageSelectionReducer, values.images, state => {
    return state
      ? state.map<ImageSelectionType>((item: ImageInput) => ({
          ...item,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          clientId: item.id!,
          status: ImageUploadStatus.Uploaded,
        }))
      : [];
  });

  const queueFile = useImageUpload(state, dispatch);

  useEffect(() => {
    const uploadedImages = state
      .filter(image => image.status == null || image.status === ImageUploadStatus.Uploaded)
      .map(
        ({ caption, filename, id, url }, i): ImageInput => ({
          caption,
          filename,
          id,
          url,
          order: i + 1,
        })
      );

    change('images', uploadedImages);
  }, [change, state]);

  return (
    <div {...props}>
      <div
        css={theme => ({
          margin: spacing(0, -1, 1)(theme),
          width: `calc(100% + ${spacing(1)(theme)})`,
          display: 'flex',
          flexWrap: 'wrap',
        })}
      >
        {state.map(img => (
          <ImageSelection
            key={img.id || img.url || img.file?.name || undefined}
            type="file"
            selection={img}
            handleDelete={() =>
              dispatch({
                type: 'REMOVE',
                payload: img,
              })
            }
            handleCaptionChange={newCaption => {
              dispatch({
                type: 'CAPTION_CHANGE',
                payload: { clientId: img.clientId, caption: newCaption },
              });
            }}
          />
        ))}
        <AddImageSelection onChange={queueFile} />
      </div>
    </div>
  );
};

export default ImageSelector;
