import { css } from "@emotion/react";
import * as React from "react";
import { updateUserAvatar } from "~actions/Auth";
import toast from "~components/App/Toast";
import Avatar from "~components/Layout/Avatar";
import Button from "~components/Layout/Button";
import FlexCenter from "~components/Layout/FlexCenter";
// import FlexSpaceAround from "~components/Layout/FlexSpaceAround";
import Margin from "~components/Layout/Margin";
import SubmitButton from "~components/Layout/SubmitButton";
// import Tooltip from "~components/Layout/Tooltip";
import { FaCloudUploadAlt, FaTimesCircle } from "~icons";
import { FormEvent } from "~types";

export type TUploadAvatarFormState = {
  errors: boolean;
  file: any;
  isSubmitting: boolean;
  showForm: boolean;
};

export type TUploadAvatarFormProps = {
  avatar?: string;
  id: string;
  serverError?: string;
  serverMessage?: string;
  updateUserAvatar: typeof updateUserAvatar;
};

const initialState = {
  errors: false,
  file: null,
  isSubmitting: false,
  showForm: false
};

export const UploadAvatarForm = ({
  avatar,
  id,
  serverError,
  serverMessage,
  updateUserAvatar
}: TUploadAvatarFormProps): JSX.Element => {
  const imageRef = React.useRef<HTMLInputElement | null>(null);
  const [state, setState] = React.useState<TUploadAvatarFormState>(
    initialState
  );
  const { errors, file, isSubmitting, showForm } = state;

  const handleChange = React.useCallback(
    ({ target: { files } }) => {
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
          file,
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
    [toast]
  );

  const toggleForm = React.useCallback(() => {
    setState(prevState => ({ ...prevState, showForm: !prevState.showForm }));
  }, []);

  const handleReset = React.useCallback(() => {
    setState(initialState);
    if (imageRef && imageRef.current) imageRef.current.value = "";
  }, []);

  const handleSubmit = React.useCallback(
    async (e: FormEvent): Promise<void> => {
      e.preventDefault();

      if (!file) {
        setState(prevState => ({ ...prevState, error: "Required!" }));
        toast({
          type: "error",
          message: "You must provide an image to upload!"
        });
      } else {
        setState(prevState => ({
          ...prevState,
          error: "",
          isSubmitting: true
        }));

        const form = new FormData();
        form.append("file", file);
        updateUserAvatar({ form, id });
      }
    },
    [updateUserAvatar]
  );

  React.useEffect(() => {
    if (state.isSubmitting && serverError)
      setState(prevState => ({ ...prevState, isSubmitting: false }));
  }, [serverError]);

  React.useEffect(() => {
    if (state.isSubmitting) handleReset();
  }, [handleReset, serverMessage]);

  return (
    <Margin as="div" right="20px" style={{ maxWidth: 200, width: "100%" }}>
      {showForm ? (
        <form data-test="upload-avatar-form" onSubmit={handleSubmit}>
          <div
            css={css`
              height: 195px;
              width: 100%;
              margin: 0 auto;
              background: #efebeb;
              position: relative;
              border: ${errors ? "1px solid #f0506e" : "1px dashed #03a9f3"};
            `}
          >
            <FlexCenter
              style={{ padding: 5, textAlign: "center" }}
              direction="column"
            >
              <Margin as="div" top="0" right="auto" bottom="0" left="auto">
                <FaCloudUploadAlt style={{ fontSize: 80 }} />
              </Margin>
              <div
                css={css`
                  font-size: 14px;
                `}
              >
                Click <strong>here</strong> or drag an image to this area.
              </div>
              <div
                css={css`
                  font-size: 12px;
                  margin: 5px 0 0 0;
                `}
              >
                Accepted formats:
              </div>
              <div
                css={css`
                  font-size: 12px;
                `}
              >
                jpg/jpeg/png &#8804; 2mb
              </div>
            </FlexCenter>
            <input
              data-test="upload-avatar-input"
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
          </div>
        </form>
      ) : (
        <Avatar avatar={avatar} width="195px" />
      )}
      {isSubmitting ? (
        <SubmitButton
          isSubmitting={isSubmitting}
          title="Upload"
          style={{ maxWidth: "250px", margin: "0 auto" }}
          submitBtnStyle={{
            background: "#010404",
            border: "2px solid #2e7c8a"
          }}
        />
      ) : (
        <Button
          primary={!showForm}
          danger={showForm}
          dataTestId="upload-selection"
          type="button"
          margin="0"
          padding="5px"
          style={{
            marginTop: 8
          }}
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
              {!avatar ? "Upload" : "Change"}
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
      )}
    </Margin>
  );
};

export default UploadAvatarForm;
