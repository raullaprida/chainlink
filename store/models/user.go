package models

import (
	"errors"
	"time"

	"github.com/smartcontractkit/chainlink/utils"
)

// User holds the credentials for API user.
type User struct {
	Email          string `json:"email" storm:"id,unique"`
	HashedPassword string `json:"hashedPassword"`
	CreatedAt      Time   `json:"createdAt" storm:"index"`
}

// NewUser creates a new user by hashing the passed plainPwd with bcrypt.
func NewUser(email, plainPwd string) (User, error) {
	if len(email) == 0 || len(plainPwd) == 0 {
		return User{}, errors.New("Must enter an email or password")
	}

	pwd, err := utils.HashPassword(plainPwd)
	if err != nil {
		return User{}, err
	}

	return User{
		Email:          email,
		HashedPassword: pwd,
		CreatedAt:      Time{Time: time.Now()},
	}, nil
}

// SessionRequest encapsulates the fields needed to generate a new SessionID,
// including the hashed password.
type SessionRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Session holds the unique id for the authenticated session.
type Session struct {
	ID string `json:"id" storm:"id,unique"`
}
