import { Button } from '@material-ui/core';
import { useUploadImageMutation } from 'features/recipes/queries.generated';
import { useFormikContext } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { tabletUp } from 'styles/mediaQueries';
import { getSpacing } from 'styles/styleSelectors';
import ImageSelection from './ImageSelection';
import imageSelectionReducer, { RecipeImageSelection, UploadStatus } from './imageSelectorReducer';
import { RecipeFormValues } from './RecipeForm';

const ImageSelector: React.FC = ({ children, ...props }) => {
  const [upload] = useUploadImageMutation();
  const { values, setFieldValue } = useFormikContext<RecipeFormValues>();

  const [state, dispatch] = React.useReducer(imageSelectionReducer, values.stagedImages, state => {
    return state
      ? state.map(item => ({
          ...item,
          url: item.url,
          status: UploadStatus.Uploaded,
        }))
      : [];
  });

  React.useEffect(() => {
    const doUpload = async ({ id, url, file }: RecipeImageSelection) => {
      if (file) {
        try {
          dispatch({ type: 'STAGING', payload: id });

          const result = await upload({ variables: { file } });
          const newId = result.data?.stageImage;

          if (!newId) throw new Error('Unexpected error, no ID back from server.');

          dispatch({ type: 'STAGED', payload: { url, newId } });
        } catch (error) {
          dispatch({ type: 'ERROR', payload: { id, error }, error: true });
        }
      }
    };

    // Look for queued images and call upload mutation.
    const imagesToUpload = state.filter(x => x.status === UploadStatus.Queued);

    if (imagesToUpload.length) {
      Promise.all(imagesToUpload.map(doUpload))
        .then(() => console.log(`Processed ${imagesToUpload.length} images.`))
        .catch(err => console.error('Error uploading images', err));
    }
  }, [state, upload]);

  React.useEffect(() => {
    const stagedImages = state
      .filter(image => [UploadStatus.Staged, UploadStatus.Uploaded].includes(image.status))
      .map((x, i) => ({ id: x.id, order: i + 1 }));

    setFieldValue('stagedImages', stagedImages);
  }, [setFieldValue, state]);

  const queueFile = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    if (files) {
      [...files].forEach(file => dispatch({ type: 'QUEUED', payload: { file } }));
    }
  };

  return (
    <div {...props}>
      <ImageSelections>
        {state.map(img => (
          <ImageSelection
            key={img.url || img.id}
            selection={img}
            handleDelete={() => dispatch({ type: 'UNSTAGE', payload: img.id })}
          />
        ))}
      </ImageSelections>
      <AddImageSelection onChange={queueFile} />
    </div>
  );
};

interface AddImageSelectionProps {
  onChange(evt: React.ChangeEvent): void;
}

const AddImageSelection: React.FC<AddImageSelectionProps> = ({ onChange }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        id="image-upload"
        multiple
        onChange={onChange}
        style={{ display: 'none' }}
        accept="image/*"
        ref={inputRef}
      />
      <label htmlFor="image-upload">
        <Button onClick={() => inputRef.current?.click()}>Add Image</Button>
      </label>
    </>
  );
};

const ImageSelections = styled.div`
  display: flex;
  overflow-y: auto;
  margin-bottom: ${getSpacing(1)};

  ${tabletUp} {
    flex-wrap: wrap;
  }
`;

export default styled(ImageSelector)``;
