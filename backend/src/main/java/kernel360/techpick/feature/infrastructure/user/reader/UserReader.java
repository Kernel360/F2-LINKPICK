package kernel360.techpick.feature.infrastructure.user.reader;

import kernel360.techpick.core.model.user.User;

public interface UserReader {

    User read(Long userId);
}
