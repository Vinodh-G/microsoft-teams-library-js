/* eslint-disable @typescript-eslint/ban-types */

import { IAppWindow } from './appWindow';
import { TaskModuleDimension } from './constants';
import { dialog } from './dialog';
import { TaskInfo } from './interfaces';

/**
 * @deprecated with TeamsJS v2 upgrades
 *
 * Namespace to interact with the task module-specific part of the SDK.
 * This object is usable only on the content frame.
 * The tasks namespace will be deprecated. Please use dialog for future developments.
 */
export namespace tasks {
  /**
   * @deprecated with TeamsJS v2 upgrades
   *
   * Allows an app to open the task module.
   *
   * @param taskInfo - An object containing the parameters of the task module
   * @param submitHandler - Handler to call when the task module is completed
   */
  export function startTask(
    taskInfo: TaskInfo,
    submitHandler?: (err: string, result: string | object) => void,
  ): IAppWindow {
    return dialog.open(getDialogInfoFromTaskInfo(taskInfo), submitHandler);
  }

  /**
   * @deprecated with TeamsJS v2 upgrades
   *
   * Update height/width task info properties.
   *
   * @param taskInfo - An object containing width and height properties
   */
  export function updateTask(taskInfo: TaskInfo): void {
    dialog.resize(taskInfo);
  }

  /**
   * @deprecated with TeamsJS v2 upgrades
   *
   * Submit the task module.
   *
   * @param result - Contains the result to be sent to the bot or the app. Typically a JSON object or a serialized version of it
   * @param appIds - Helps to validate that the call originates from the same appId as the one that invoked the task module
   */
  export function submitTask(result?: string | object, appIds?: string | string[]): void {
    dialog.submit(result, appIds);
  }

  function getDialogInfoFromTaskInfo(taskInfo: TaskInfo): TaskInfo {
    const dialogHeight =
      taskInfo.height && typeof taskInfo.height !== 'number'
        ? getDialogDimensionFromTaskModuleDimension(taskInfo.height)
        : (taskInfo.height as number);
    const dialogWidth =
      taskInfo.width && typeof taskInfo.width !== 'number'
        ? getDialogDimensionFromTaskModuleDimension(taskInfo.width)
        : (taskInfo.width as number);
    const dialogInfo: TaskInfo = {
      url: taskInfo.url,
      card: taskInfo.card,
      height: dialogHeight,
      width: dialogWidth,
      title: taskInfo.title,
      fallbackUrl: taskInfo.fallbackUrl,
      completionBotId: taskInfo.completionBotId,
    };
    return dialogInfo;
  }

  function getDialogDimensionFromTaskModuleDimension(taskModuleDimension: TaskModuleDimension): TaskModuleDimension {
    if (taskModuleDimension === TaskModuleDimension.Large) {
      return TaskModuleDimension.Large;
    } else if (taskModuleDimension === TaskModuleDimension.Medium) {
      return TaskModuleDimension.Medium;
    } else {
      return TaskModuleDimension.Small;
    }
  }
}