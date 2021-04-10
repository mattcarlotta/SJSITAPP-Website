import * as React from "react";
import { css } from "@emotion/react";
import { deleteUserAvatar, updateUserAvatar } from "~actions/Auth";
import toast from "~components/App/Toast";
import Avatar from "~components/Layout/Avatar";
import Button from "~components/Layout/Button";
import Margin from "~components/Layout/Margin";
import SubmitButton from "~components/Layout/SubmitButton";
import UploadAvatarInstructions from "~components/Layout/UploadAvatarInstructions";
import { FaCloudUploadAlt, FaTimesCircle, FaTrash } from "~icons";

export type TUploadAvatarFormState = {
  isSubmitting: boolean;
  showForm: boolean;
};

export type TUploadAvatarFormProps = {
  avatar?: string;
  deleteUserAvatar: typeof deleteUserAvatar;
  id: string;
  serverError?: string;
  serverMessage?: string;
  updateUserAvatar: typeof updateUserAvatar;
};

const initialState = {
  isSubmitting: false,
  showForm: false
};

export const UploadAvatarForm = ({
  avatar,
  deleteUserAvatar,
  id,
  serverError,
  serverMessage,
  updateUserAvatar
}: TUploadAvatarFormProps): JSX.Element => {
  const imageRef = React.useRef<HTMLInputElement | null>(null);
  const [state, setState] = React.useState<TUploadAvatarFormState>(
    initialState
  );
  const { isSubmitting, showForm } = state;

  const handleChange = React.useCallback(
    ({ target: { files } }): void => {
      try {
        const file = files[0];

        const isAccepted = ["image/jpg", "image/jpeg", "image/png"].some(
          type => type === file.type
        );
        const isLt2MB = file.size / 2048000 <= 1;

        if (!isAccepted || !isLt2MB)
          throw String("Only 2mb or less .jpg/.jpeg/.png files are accepted!");

        const img = new Image();
        img.src = URL.createObjectURL(file);

        setState(prevState => ({
          ...prevState,
          isSubmitting: true
        }));

        const form = new FormData();
        form.append("file", file);
        updateUserAvatar({ form, id });
      } catch (e) {
        toast({
          type: "error",
          message: e.toString()
        });
      }
    },
    [toast, updateUserAvatar]
  );

  const toggleForm = (): void => {
    setState(prevState => ({ ...prevState, showForm: !prevState.showForm }));
  };

  React.useEffect(() => {
    if (state.isSubmitting && serverError) {
      /* istanbul ignore else */
      if (imageRef && imageRef.current) imageRef.current.value = "";
      setState(prevState => ({ ...prevState, isSubmitting: false }));
    }
  }, [serverError]);

  React.useEffect(() => {
    if (state.isSubmitting && showForm) {
      /* istanbul ignore else */
      if (imageRef && imageRef.current) imageRef.current.value = "";
      setState(initialState);
    }
  }, [serverMessage]);

  return (
    <Margin
      as="div"
      data-testid="upload-avatar-form-container"
      right="20px"
      bottom="10px"
      style={{ maxWidth: 200, width: "100%" }}
    >
      {showForm ? (
        <form
          data-testid="upload-avatar-form"
          css={css`
            height: 195px;
            width: 200px;
            margin: 0 auto;
            background: #efebeb;
            position: relative;
            border: 1px dashed #03a9f3;
          `}
          onSubmit={/* istanbul ignore next */ e => e.preventDefault()}
        >
          <UploadAvatarInstructions />
          <input
            data-testid="upload-avatar-input"
            disabled={isSubmitting}
            css={css`
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
              opacity: 1e-5;
              width: 100%;
              cursor: pointer;
              z-index: 10;
            `}
            ref={imageRef}
            type="file"
            accept="image/*"
            multiple={false}
            onChange={handleChange}
          />
        </form>
      ) : (
        <Avatar avatar={avatar} height="195px" width="195px" />
      )}
      {isSubmitting ? (
        <SubmitButton
          isSubmitting
          title="Upload"
          maxWidth="250px"
          style={{ margin: "8px auto 0 auto" }}
          submitBtnStyle={{ height: 46 }}
        />
      ) : (
        <>
          {!avatar ? (
            <Button
              primary={!showForm}
              danger={showForm}
              dataTestId="toggle-upload-form-button"
              type="button"
              margin="8px 0 0 0"
              padding="10px"
              onClick={toggleForm}
            >
              {!showForm ? (
                <>
                  <FaCloudUploadAlt
                    style={{
                      fontSize: 17,
                      position: "relative",
                      top: 3,
                      marginRight: 5
                    }}
                  />
                  Upload Avatar
                </>
              ) : (
                <>
                  <FaTimesCircle
                    style={{
                      fontSize: 17,
                      position: "relative",
                      top: 3,
                      marginRight: 5
                    }}
                  />
                  Cancel
                </>
              )}
            </Button>
          ) : (
            !showForm && (
              <Button
                danger
                dataTestId="remove-avatar-button"
                type="button"
                margin="8px 0 0 0"
                padding="10px"
                onClick={() => deleteUserAvatar(id)}
              >
                <>
                  <FaTrash
                    style={{
                      fontSize: 17,
                      position: "relative",
                      top: 3,
                      marginRight: 5
                    }}
                  />
                  Remove Avatar
                </>
              </Button>
            )
          )}
        </>
      )}
    </Margin>
  );
};

export default UploadAvatarForm;
