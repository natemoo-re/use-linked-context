import { useState, useCallback, useContext, useEffect } from 'react';
import { createUseLinkedContext } from './create.js'

export const useLinkedContext = createUseLinkedContext({ useState, useCallback, useContext, useEffect });
