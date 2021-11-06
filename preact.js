import { useState, useCallback, useContext, useEffect } from 'preact/hooks';
import { createUseLinkedContext } from './create.js'

export const useLinkedContext = createUseLinkedContext({ useState, useCallback, useContext, useEffect });
