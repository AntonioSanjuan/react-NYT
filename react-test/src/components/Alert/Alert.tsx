import { useAlert } from '../../hooks/alert/alertHook';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectLayoutIsAlertOpened } from '../../state/layout/layout.selectors';
import Modal from '../common/modal/modal';

function Alert() {
  const { getAlertContent } = useAlert();
  const isModalOpened = useAppSelector<boolean>(selectLayoutIsAlertOpened);

  return (
    <>
      { isModalOpened
                && (
                <Modal
                  showHeader
                >
                  {getAlertContent()}
                </Modal>
                )}
    </>
  );
}

export default Alert;
