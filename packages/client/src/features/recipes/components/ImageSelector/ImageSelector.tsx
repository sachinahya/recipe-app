import { RecipeFormValues } from 'features/recipes/formValues';
import { useFormikContext } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { tabletUp } from 'styles/mediaQueries';
import { getSpacing } from 'styles/styleSelectors';

import { ImageInput } from '../../../types.gql';
import AddImageSelection from './AddImageSelection';
import ImageSelection from './ImageSelection';
import imageSelectionReducer, {
  ImageSelectionType,
  ImageUploadStatus,
} from './imageSelectorReducer';
import useImageUpload from './useImageUpload';

const ImageSelector: React.FC = ({ children, ...props }) => {
  const { values, setFieldValue } = useFormikContext<RecipeFormValues>();

  const [state, dispatch] = React.useReducer(imageSelectionReducer, values.images, state => {
    return state
      ? state.map<ImageSelectionType>((item: ImageInput & { id: string }) => ({
          ...item,
          clientId: item.id,
          status: ImageUploadStatus.Uploaded,
        }))
      : [];
  });

  const queueFile = useImageUpload(state, dispatch);

  React.useEffect(() => {
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

    setFieldValue('images', uploadedImages);
  }, [setFieldValue, state]);

  return (
    <div {...props}>
      <ImageSelections>
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
      </ImageSelections>
    </div>
  );
};

const ImageSelections = styled.div`
  margin: 0 -${getSpacing(1)} ${getSpacing(1)} -${getSpacing(1)};
  width: calc(100% + ${getSpacing(1)});
  display: flex;
  flex-wrap: wrap;
`;

export default ImageSelector;
