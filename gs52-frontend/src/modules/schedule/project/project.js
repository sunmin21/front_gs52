import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../../lib/createRequestSaga";
import * as API from "../../../lib/api/schedule/Project";
import { takeLatest } from "redux-saga/effects";

const PROJECTNO = "schedule/PROJECTNO";
const PROJECTWITHCHANGE = "schedule/PROJECTWITHCHANGE";
const PROJECTFILECHANGE = "schedule/PROJECTFILECHANGE";
const PROJECTFILECONCAT = "schedule/PROJECTFILECONCAT";
const UPLODAFILEDELETE = "schedule/UPLODAFILEDELETE";
const [PROJECT, PROJECT_SUCCESS, PROJECT_FAILURE] =
  createRequestActionTypes("schedule/PROJECT"); //타입유형
const [PROJECTWITH, PROJECTWITH_SUCCESS, PROJECTWITH_FAILURE] =
  createRequestActionTypes("schedule/PROJECTWITH"); //타입유형

const [PROJECTFILE, PROJECTFILE_SUCCESS, PROJECTFILE_FAILURE] =
  createRequestActionTypes("schedule/PROJECTFILE"); //타입유형
const [PROJECTTODO, PROJECTTODO_SUCCESS, PROJECTTODO_FAILURE] =
  createRequestActionTypes("schedule/PROJECTTODO"); //타입유형

const [
  PROJECTTODODETAIL,
  PROJECTTODODETAIL_SUCCESS,
  PROJECTTODODETAIL_FAILURE,
] = createRequestActionTypes("schedule/PROJECTTODODETAIL"); //타입유형

export const projectAxios = createAction(PROJECT, (index) => {
  return {
    index,
  };
});
export const projectWithAxios = createAction(PROJECTWITH, (index) => {
  return {
    index,
  };
});

export const projectFileAxios = createAction(PROJECTFILE, (index) => {
  return {
    index,
  };
});
export const projectTodoAxios = createAction(PROJECTTODO, (index) => {
  return {
    index,
  };
});
export const projectTodoDetailAxios = createAction(
  PROJECTTODODETAIL,
  (index) => {
    return {
      index,
    };
  }
);

export const projectNoChange = createAction(PROJECTNO, ({ index }) => {
  return {
    index,
  };
});

export const projectWithChange = createAction(
  PROJECTWITHCHANGE,
  (projectWith) => {
    return {
      projectWith,
    };
  }
);

export const projectFileChange = createAction(
  PROJECTFILECHANGE,
  (projectFile) => {
    return {
      projectFile,
    };
  }
);
export const projectFileConcats = createAction(
  PROJECTFILECONCAT,
  (projectFiles) => {
    return {
      projectFiles,
    };
  }
);
export const projectUplodaFileDelete = createAction(
  UPLODAFILEDELETE,
  (uploadFile) => {
    return {
      uploadFile,
    };
  }
);

const projectSelectSaga = createRequestSaga(PROJECT, API.SelectOneProject);

const projectWithSelectSaga = createRequestSaga(PROJECTWITH, API.SelectOneWith);

const projectFileSelectSaga = createRequestSaga(PROJECTFILE, API.SelectOneFile);

const projectTodoSelectSaga = createRequestSaga(PROJECTTODO, API.SelectTask);
const projectTodoDetailSelectSaga = createRequestSaga(
  PROJECTTODODETAIL,
  API.SelectTaskDetail
);

export function* projectSaga2() {
  yield takeLatest(PROJECT, projectSelectSaga);
  yield takeLatest(PROJECTWITH, projectWithSelectSaga);
  yield takeLatest(PROJECTFILE, projectFileSelectSaga);
  yield takeLatest(PROJECTTODO, projectTodoSelectSaga);
  yield takeLatest(PROJECTTODODETAIL, projectTodoDetailSelectSaga);
}

const initialState = {
  //초기값을 정의
  projectNo: 0,
  projectContent: {
    PROJECT_INDEX: "",
    PROJECT_TITLE: "",
    PROJECT_CONTENT: "",
    PROJECT_START: "",
    PROJECT_END: "",
    PROJECT_OKAY: "",
    PROJECT_DATE: "",
  },
  projectFile: [
    {
      PROJECT_FILE_INDEX: "",
      PROJECT_FILE_PROJECT_INDEX: "",
      PROJECT_FILE_ORIGIN_NAME: "",
      PROJECT_FILE_NAME: "",
      PROJECT_FILE_PATH: "",
      PROJECT_FILE_DATE: "",
    },
  ],
  uploadFile: [],
  projectWith: [
    {
      PROJECT_WITH_INDEX: "",
      PROJECT_WITH_EMP_INDEX: "",
      PROJECT_INDEX: "",
      PROJECT_WITH_OKAY: "",
      PROJECT_WITH_REJECT: "",
      PROJECT_WITH_LEADER: "",
      PROJECT_WITH_COLOR: "",
      emp_NAME: "",
      team_NAME: "",
      dept_NAME: "",
    },
  ],
  projectTodo: [
    {
      project_TASK_INDEX: "",
      project_INDEX: "",
      project_TASK_SUCCESS: "",
      project_TASK_PERCENT: "",
      project_TASK_CONTENT: "",
      percent_SUM: 0,
    },
  ],
  projectTodoDetail: [
    {
      PROJECT_TASK_DETAIL_INDEX: "",
      PROJECT_TASK_INDEX: "",
      PROJECT_TASK_DETAIL_CONTENT: "",
      PROJECT_TASK_DETAIL_PERCENT: "",
      PROJECT_TASK_DETAIL_EMP: "",
      PROJECT_INDEX: "",
    },
  ],
  projectTodoError: null,
  projectError: null,
  projectWithError: null,
  projectFileError: null,
  projectTodoDetailError: null,
};

// 리듀서 선언부분
const project = handleActions(
  {
    [PROJECT_SUCCESS]: (state, { payload: projectContent }) => ({
      ...state,
      projectError: null,
      projectContent,
    }),

    [PROJECT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      projectError: error,
    }),
    [PROJECTWITH_SUCCESS]: (state, { payload: projectWith }) => ({
      ...state,
      projectWithError: null,
      projectWith,
    }),

    [PROJECTWITH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      projectWithError: error,
    }),
    [PROJECTFILE_SUCCESS]: (state, { payload: projectFile }) => ({
      ...state,
      projectFileError: null,
      projectFile,
    }),

    [PROJECTFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      projectFileError: error,
    }),
    [PROJECTTODO_SUCCESS]: (state, { payload: projectTodo }) => ({
      ...state,
      projectTodoError: null,
      projectTodo,
    }),

    [PROJECTTODO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      projectTodoError: error,
    }),
    [PROJECTTODODETAIL_SUCCESS]: (state, { payload: projectTodoDetail }) => ({
      ...state,
      projectTodoDetailError: null,
      projectTodoDetail,
    }),

    [PROJECTTODODETAIL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      projectTodoDetailError: error,
    }),

    [PROJECTNO]: (state, { payload: { index } }) => {
      return {
        ...state,
        projectNo: index,
      };
    },

    [PROJECTWITHCHANGE]: (state, { payload: { projectWith } }) => {
      return {
        ...state,
        projectWith,
      };
    },
    [PROJECTFILECHANGE]: (state, { payload: { projectFile } }) => {
      return {
        ...state,
        projectFile,
      };
    },
    [PROJECTFILECONCAT]: (state, { payload: { projectFiles } }) => {
      let temp = state.projectFile;
      let temp2 = state.uploadFile;

      for (let key of Object.keys(projectFiles)) {
        temp = temp.concat(projectFiles[key]);
        temp2 = temp2.concat(projectFiles[key]);
      }

      return {
        ...state,
        projectFile: temp,
        uploadFile: temp2,
      };
    },
    [UPLODAFILEDELETE]: (state, { payload: { uploadFile } }) => {
      return {
        ...state,
        uploadFile,
      };
    },
  },
  initialState
);

export default project;
