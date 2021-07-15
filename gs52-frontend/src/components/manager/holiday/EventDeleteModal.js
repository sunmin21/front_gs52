import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CButton,
} from "@coreui/react";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function EventDeleteModal({
  info, setInfo, event, 
})